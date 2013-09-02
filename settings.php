<?php
defined('MOODLE_INTERNAL') || die();
require_once(dirname(__FILE__) . '/lib.php');
if ($hassiteconfig) {
	
	$page = new admin_settingpage('loginas', get_string('pluginname', 'local_loginas_contextmenu'));
	$page->add(new admin_setting_heading('local_loginas_contextmenu/settingheading', 'Login As Settings', ''));
	$page->add(new admin_setting_configcheckbox('local_loginas_contextmenu/enableloginas', get_string('enableloginas', 'local_loginas_contextmenu'),
        get_string('enableloginasdesc', 'local_loginas_contextmenu'), array(), 1,0));
	$choices = array('participants'=>'Participants page','enrolledusers'=>'Enrolled Users page');	
	$page->add(new admin_setting_configmulticheckbox('local_loginas_contextmenu/loginaslocations',get_string('loginaslocations','local_loginas'),get_string('loginaslocationsdesc','local_loginas_contextmenu'),array(),$choices));
	$ADMIN->add('localplugins', $page);
	
}
