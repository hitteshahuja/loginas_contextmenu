<?
global $PAGE;
$pagetype =  $PAGE->bodyid;
$loginas_link = "/course/loginas.php?";
$course  = $PAGE->course;
$context = context_course::instance($course->id);
$loginasenabled = get_config('local_loginas_contextmenu','enableloginas');
$locationstring = get_config('local_loginas_contextmenu','loginaslocations');
$locations = array();
if(!empty($locationstring)){
$locations = explode(',', get_config('local_loginas_contextmenu','loginaslocations'));	
}
$pagetypevalue = "";
switch ($pagetype){
	case 'page-enrol-users':
		//Only on enrolled users page
		if(in_array('enrolledusers', $locations)){
			$pagetypevalue = $pagetype;
		}
	break;
	case (preg_match('/page-course-view-*/', $pagetype) ? true : false):
		if(in_array('participants', $locations)){
			$pagetypevalue = $pagetype;
		}
	break;
}
//Only load the loginas module.js if the current logged in user has the capability
if(!session_is_loggedinas() && has_capability('moodle/user:loginas',$context) && ($loginasenabled == 1) ){
	$module              = array(
            'name' => 'loginas',
            'fullpath' => '/local/loginas_contextmenu/module.js'
            
        );
        $params              = array('loginaslink'=>$loginas_link,'pagetype'=>$pagetypevalue,'bodyid'=> $pagetype);
        $PAGE->requires->js_init_call('M.LoginAs.init', array(
            $params
        ), false, $module);
		
		$viewprofile_link = "";
		echo html_writer::start_tag('div',array('id'=>'contextmenu_box','style'=>'display:none'));
		echo  html_writer::start_tag('ul',array('id'=>'contextmenu'));
		echo html_writer::start_tag('li');
		echo html_writer::start_tag('img',array('src'=>$CFG->wwwroot.'/local/loginas_contextmenu/key.png'));
		echo html_writer::link('#', 'Login As',array('id'=>'loginas'));
		echo html_writer::end_tag('li');
		echo html_writer::start_tag('li');
		echo html_writer::start_tag('img',array('src'=>$CFG->wwwroot.'/local/loginas_contextmenu/user-4.png'));
		echo html_writer::link('#', 'Profile',array('id'=>'profilelink'));
		echo html_writer::end_tag('li');
		echo html_writer::end_tag('ul');
		echo  "<div class=\"yui3-widget-ft\"></div>";
		echo html_writer::end_tag('div');
	
}
 
