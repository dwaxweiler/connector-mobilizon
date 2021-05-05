<?php
namespace MobilizonConnector;

// Exit if this file is called directly.
if (!defined('ABSPATH')) {
  exit;
}

class EventsListWidget extends \WP_Widget {

  public function __construct() {
    parent::__construct(
      NAME . '-events-list',
      NICE_NAME . ' ' . esc_html__('Events List', TEXT_DOMAIN),
      array(
        'description' => __('A list of the upcoming events of the connected Mobilizon instance.', TEXT_DOMAIN),
      ),
    );
  }

  public function widget($args, $options) {
    echo $args['before_widget'];

    if (!empty($options['title'])) {
      echo $args['before_title'].apply_filters('widget_title', $options['title']).$args['after_title'];
    }

    $classNamePrefix = NAME;
    $eventsCount = $options['eventsCount'];
    $locale = str_replace('_', '-', get_locale());
    $groupName = isset($options['groupName']) ? $options['groupName'] : '';
    $url = Settings::getUrl();
    $textDomain = TEXT_DOMAIN;
    $timeZone = get_option('timezone_string');

    require dirname(__DIR__) . '/view/events-list.php';

    echo $args['after_widget'];
  }

  public function form($options) {
    $title = !empty($options['title']) ? $options['title'] : esc_html__('Events', TEXT_DOMAIN);
    $eventsCount = !empty($options['eventsCount']) ? $options['eventsCount'] : DEFAULT_EVENTS_COUNT;
    $groupName = !empty($options['groupName']) ? $options['groupName'] : '';
    $textDomain = TEXT_DOMAIN;
    
    require dirname(__DIR__) . '/view/events-list-widget/form.php';
  }

  public function update($new_options, $old_options) {
    if (!current_user_can('edit_theme_options')) {
      return;
    }
    $options = array();
    $options['title'] = !empty($new_options['title']) ? sanitize_text_field($new_options['title']) : '';
    $options['eventsCount'] = !empty($new_options['eventsCount']) ? sanitize_text_field($new_options['eventsCount']) : 5;
    $options['groupName'] = !empty($new_options['groupName']) ? sanitize_text_field($new_options['groupName']) : '';
    return $options;
  }
}
