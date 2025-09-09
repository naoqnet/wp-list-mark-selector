<?php
/**
 * Plugin Name: List Mark Selector
 * Description: ブロックテーマ専用 - リストブロックのマークを選択できるプラグイン
 * Version: 2.0.0
 * Author: Your Name
 * Requires at least: 6.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Text Domain: list-mark-selector
 */

 
 // Prevent direct access
 if (!defined('ABSPATH')) {
     exit;
 }
 
 class ListMarkerSettings {
     
     public function __construct() {
         add_action('init', array($this, 'init'));
     }
     
     public function init() {
         // Register and enqueue editor scripts
         add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
     }
     
     public function enqueue_editor_assets() {
         // Register the script
         wp_enqueue_script(
             'list-marker-settings-script',
             plugin_dir_url(__FILE__) . 'assets/list-marker-selector.js',
             array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
             '1.0',
             true
         );
         
         // Register the CSS
         wp_enqueue_style(
             'list-marker-settings-style',
             plugin_dir_url(__FILE__) . 'assets/list-marker-selector.css',
             array(),
             '1.0'
         );
     }
 }
 
 // Initialize the plugin
 new ListMarkerSettings();
 ?>