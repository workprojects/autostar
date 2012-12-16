<?php
/**
 * @package WordPress
 * @subpackage Default_Theme
 */
 
if (function_exists('add_theme_support')) {
    add_theme_support('menus');
}

register_sidebar( array(
		'name' => __( 'Main Menu Area' ),
		'id' => 'Main-menu-area',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
    
function new_excerpt_length($length) {
	return 35;
}
add_filter('excerpt_length', 'new_excerpt_length'); 

function new_excerpt_more($more) {
	return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');