// TinyMCE - Config
tinymce.init({
	selector: ".content-editor",
	width: 840,
 	height: 150,
	// ===========================================
	// INCLUDE THE PLUGIN
	// ===========================================


  	plugins: [
    	"advlist autolink lists link image charmap print preview anchor",
    	"searchreplace visualblocks code fullscreen",
    	"insertdatetime media table contextmenu paste"
  	],

  	// ===========================================
  	// PUT PLUGIN'S BUTTON on the toolbar
  	// ===========================================

  	toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
  	toolbar2: "link unlink anchor | image media | forecolor backcolor  | print preview code ",
  	// ===========================================
  	// SET RELATIVE_URLS to FALSE (This is required for images to display properly)
  	// ===========================================

  	style_formats: [
		{title: 'Bold text', inline: 'b'},
		{title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
		{title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
		{title: 'Example 1', inline: 'span', classes: 'example1'},
		{title: 'Example 2', inline: 'span', classes: 'example2'},
		{title: 'Table styles'},
		{title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
   ],

  	relative_urls: false,

  	image_advtab: true
});
