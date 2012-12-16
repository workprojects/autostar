<?php
/**
 * @package WordPress
 * @subpackage Default_Theme
 */
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head profile="http://gmpg.org/xfn/11">
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
<link href="/favicon.ico" type="image/x-icon" rel="icon" />
<link href="/favicon.ico" type="image/x-icon" rel="shortcut icon" />
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/has-sub-menu.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/teaser.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/start.js"></script>

<!--
<link rel="stylesheet" href="<?php //bloginfo('template_directory'); ?>/css/project.min.css" type="text/css" />
<link rel="stylesheet" href="<?php //bloginfo('template_directory'); ?>/css/form_overlow.css" type="text/css" />
<link rel="stylesheet" href="<?php //bloginfo('template_directory'); ?>/css/jquery.selectBox.css" type="text/css" />
<link rel="stylesheet" href="<?php //bloginfo('template_directory'); ?>/css/datePicker.css" type="text/css" />
<link rel="stylesheet" href="<?php //bloginfo('template_directory'); ?>/css/jquery-ui.css" type="text/css" />
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/cufon-yui.js"></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/VWHeadlineOT_400-VWHeadlineOT_900-VWHeadlineOT_600.font.js"></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/flash_detect_min.js"></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/selectBox/jquery.selectBox.js"></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/shared/jquery.datePicker.js"></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/shared/jshttprequest.js"></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/shared/global.js"></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/shoporder/shoporder.js" ></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/shop/shop.js" ></script>
<script type="text/javascript" src="<?php //bloginfo('template_directory'); ?>/js/jquery/jquery.maskedinput-1.2.2.js"></script>
-->

<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div class="page-holder">

        <div class="page-area">
        
            <div class="header">

                <div class="logo-volkswagen"></div>
            
                <div class="logo-site">
                    <a href="/"></a>
                    <span>
                        Черкаси, вул. Академіка Корольва, 38<br />
                        тел.: 0472 65-36-78
                    </span>
                </div>

                <!-- top-right-menu -->
                <?php wp_nav_menu(
                    array(
                        'container' => '',
                        'menu' => 'top-right-menu',
                        'menu_class'=>'top-right-menu menu',
                        'items_wrap' => '<ul class="%2$s">%3$s</ul>'
                    )
                ); ?>

                <div class="clear"></div>

                <!-- main-menu -->
                <?php wp_nav_menu(
                    array(
                        'container' => '',
                        'menu' => 'main-menu',
                        'menu_class'=>'main-menu menu',
                        'items_wrap' => '<ul class="%2$s">%3$s</ul>'
                    )
                ); ?>

                <div class="top-right-buttons">
                    <a href="#" class="brochure"></a>
                    <a href="#" class="configurator"></a>
                </div>
                
            </div><!-- header -->