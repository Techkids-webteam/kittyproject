angular.module('dateTimeServices', [])

    .factory('DateTime', function ($http, $q, AuthToken) {
        var dateTimeFactory = {};
        var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        var days2 = ['Mon', 'Tues', 'Wedn', 'Thur', 'Fri', 'Sat', 'Sun'];
        var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var month2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        var regexShort = ['ss', 'mm', 'hh', 'wd', 'dd', 'MM', 'yy'];
        var regexLong = ['WD', 'MMMM', 'yyyy', 'MMM'];

        var replaceShort = [function (date) { return get2(date.getSeconds()) }, function (date) { return get2(date.getMinutes()) }, function (date) { return get2(date.getHours()) },
            function (date) { return days2[date.getDay() - 1] }, function (date) { return get2(date.getDate()) }, function (date) { return get2(date.getMonth() + 1) }, function (date) { return get2(date.getFullYear()) }];

        var replaceLong = [function (date) { return days[date.getDay() - 1] }, function (date) { return month[date.getMonth()] }, function (date) { return get4(date.getFullYear()) }, function (date) { return month2[date.getMonth()] } ];

        function clearDuplicate(regex, duplicate, replace) {
            if (regex.includes(duplicate)) {
                return clearDuplicate(regex.replace(duplicate, replace), duplicate, replace);
            }
            return regex;
        }

        function get2(num) {
            return !(num = parseInt(num)) ? '00' : num > 9 || num < 0 ? num : '0' + num;
        }

        function get4(num) {
            return !(num = parseInt(num)) ? '0000' : num > 999 || num < 0 ? num % 10000 : num > 999 ? num : num > 99 ? '0' + num : num > 9 ? '00' + num : '000' + num; 
        }

        function regexConvert(regex) {
            if (!regex || !(regex = regex.toString())) return null;

            regex = clearDuplicate(regex, 'yyyyy', 'yyyy');
            regex = clearDuplicate(regex, 'MMMMM', 'MMMM');

            regexShort.forEach(function (ele, i) {
                if (ele != 'yy' && ele != 'MM') {
                    if (regex.includes(ele)) {
                        regex = clearDuplicate(regex, ele + ele.substring(0, 1), ele);
                    }
                } else {
                    while (regex.includes('yyy') && !regex.includes('yyyy')) {
                        regex = regex.replace('yyy', 'yy');
                    }
                }
            });
            return regex;
        }

        function dateConvert(date, regex) {
            if ((date = new Date(date)) && regex) {
                regexLong.forEach(function (ele, i) {
                    while (regex.includes(ele)) {
                        regex = regex.replace(ele, replaceLong[i](date));
                    }
                });
                regexShort.forEach(function (ele, i) {
                    while (regex.includes(ele)) {
                        regex = regex.replace(ele, replaceShort[i](date));
                    }
                });
                return regex;
            }
        }

        dateTimeFactory.convert = function (date, regex) {
            if (date) {
                date = new Date(date);
                regex = regexConvert(regex || 'dd/MM/yyyy hh:mm');
                return dateConvert(date, regex);
            }
            return '';
        }

        return dateTimeFactory;

    })