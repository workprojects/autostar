<head>
<title>{#tagwrap_dlg.titleCanvas}</title>
<script type="text/javascript" src="../../../tinymce/tiny_mce_popup.js"></script>
<script type="text/javascript" src="js/dialog.js"></script>
<link rel="stylesheet" type="text/css" href="css/tagwrap.css" />
</head>

<body>

<div class="y_logo_contener">
	<img src="img/html5.png" alt="HTML5" />
</div>
<div class="yinstr">
    <p>{#tagwrap_dlg.noteCanvas}</p>
    <p>{#tagwrap_dlg.noteCanvas4}</p>
</div>
<form onSubmit="TagwrapDialog.insert();return false;" action="#" method="post" name="Canvas_tag">
<div class="mceActionPanel">
<script type="text/javascript" language="javascript">
var jwl_sel_content4 = tinyMCE.activeEditor.selection.getContent();
</script>

{#tagwrap_dlg.noteCanvas1} <input id="title_value" type="text" name="title" width="200px" value="" /> 
<br /><br />
{#tagwrap_dlg.noteCanvas2} <input id="title_value" type="text" name="title2" width="200px" value="" /> 
<br /><br />
{#tagwrap_dlg.noteCanvas3} <input id="title_value" type="text" name="title3" width="200px" value="" /> 
<br /><br />
</div>
<div style="margin-top:80px;"</div>
<div class="bottom">
    <p><!--{#tagwrap_dlg.bottomnote}--></p>
    <p class="pagelink_hover"><!--{#tagwrap_dlg.bottomnote2}--></p>
</div>
<script type="text/javascript" language="javascript">
function jwl_pass_form_data () {
  var name = jwl_title = document.getElementsByName("title")[0].value;
  var name = jwl_title2 = document.getElementsByName("title2")[0].value;
  var name = jwl_title3 = document.getElementsByName("title3")[0].value;
}

</script>
<div class="mceActionPanel">
  <div style="float:left;padding-top:5px">
  <input type="button" id="insert" name="insert" value="{#insert}" onClick="jwl_pass_form_data();tinyMCE.execCommand('mceInsertContent',false,'<canvas id=\'' + jwl_title + '\' width=\'' + jwl_title2 + '\' height=\'' + jwl_title3 + '\'>' + jwl_sel_content4 + '</canvas>');tinyMCEPopup.close();" />&nbsp;<input type="button" id="cancel" name="cancel" value="{#cancel}" onClick="tinyMCEPopup.close();" />
  </div>
</div>
</form>
<span style="float:right;"><a target="_blank" href="http://www.joshlobe.com/2012/07/ultimate-tinymce-advanced-html-tags/"><img src="img/tinymce_help.png" /></a></span>
</body>