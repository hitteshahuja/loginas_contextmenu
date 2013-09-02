M.LoginAs = M.LoginAs || {} ;
M.LoginAs.ENROLPAGETYPE = 'page-enrol-users';
M.LoginAs.PARTICIPANTSPAGETYPE = 'page-course-view-weeks';
M.LoginAs.init = function(Y,params){
	var loginas = params[0];
	var pagetype = params[1];
	YUI().use('overlay','querystring-parse','anim', function (Y) {
	//Declarations	
	var bodyContent = '<div id = "contextmenu_box"><ul id = "contextmenu\" ><li>Login As</li><li>View Profile</li></ul></div>';
			var contextMenu = new Y.Overlay({
			srcNode : '#contextmenu_box',
			visible:false,
			width : "140px",
    		zIndex:2,
		});
		
		contextMenu.render('');
	var showMenu = function(e){
		e.preventDefault();
		Y.one('#contextmenu_box').setStyle('display','block');
		//Get the url of the user
		var userURL = '';
		if(pagetype == M.LoginAs.PARTICIPANTSPAGETYPE )
		{
			 userURL = e._currentTarget.parentElement.href;
		}
		else{
			 userURL = e._currentTarget.childNodes[0].href;
		}
		var queryParams = Y.QueryString.parse(userURL.substring(userURL.indexOf('?')+1));
		var loginasLink = M.cfg.wwwroot +  loginas + 'id='+queryParams.course+'&user='+queryParams.id + '&sesskey='+M.cfg.sesskey;
		var profileLink = M.cfg.wwwroot + '/user/profile.php?id='+queryParams.id; 
		Y.one('#profilelink').setAttribute('href',profileLink);
		var loginNode = Y.one('#loginas').setAttribute('href',loginasLink);
		var a = Y.WidgetPositionAlign;
		contextMenu.set("align", {node:e._currentTarget, 
                      points:[a.TL, a.TR]});
		//From the URL, get the userid
		if(contextMenu.get('visible') == true){
			contextMenu.hide();
		}
		else
		{
			if(Y.one('body').getAttribute('id') == pagetype){

			contextMenu.show();
			}
		}
		//Hide if its visible
		/*var closeMenu = Y.one('#closecontext');
	closeMenu.on('click',function(){
		contextMenu.hide();
		});*/
	}
	var userNodes = null;
	if(pagetype == M.LoginAs.ENROLPAGETYPE){
		userNodes = Y.all('.userenrolment .subfield_picture');	
	}
	if(pagetype == M.LoginAs.PARTICIPANTSPAGETYPE ){
		userNodes = Y.all('#participants .userpicture');
	}
	if(null != userNodes){
		userNodes.on('contextmenu',showMenu,pagetype);
	}
	
	});
	
}


