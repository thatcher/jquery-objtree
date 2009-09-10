(function(_){
    // we add brandon aarons outerhtml for convenience to display 
    // the entire dom object when applicable
    (function($) {
     // Returns whether or not a result set has results in it
     $.fn.outerHTML = function() {
       return $('<div>').append( this.eq(0).clone() ).html();
     };
    })(jQuery);
  	// RSpec/Bacon Style
    
	with (jqUnit) {
		
		//tests basic init functionality
		describe('jQuery jsPath ObjTree', 'js/json/xml plugins', {
            
			before: function(){
                //no setup for this spec
			}
            
		}).should('make an element out of an object',function(){
            
            var expected = _.escape('<div />\n');
            var actual = _.escape(_.js2xml({
                div:{}
            }));
            equals(expected, actual, 'empty object');
            
        }).should('make an element out of an object with a simple value',function(){
            
            var expected = _.escape('<div>hello</div>\n');
            var actual = _.escape(_.js2xml({
                div:'hello'
            }));
            equals(expected, actual, 'empty object');
            
        }).should('create attributes for properties starting with $',function(){
            
            var expected = _.escape('<div id="1" class="container" />\n');
            var actual = _.escape(_.js2xml({
                div:{
                    $id: 1,
                    $class: 'container'
                }
            }));
            equals(actual, expected, 'object with attributes\n');
            
        }).should('create text for properties named  $',function(){
            
            var expected = _.escape('<div id="1" class="container">this is a pig</div>\n');
            var actual = _.escape(_.js2xml({
                div:{
                    $id: 1,
                    $class: 'container',
                    $:"this is a pig"
                }
            }));
            equals(expected, actual, 'with attributes and text\n');
            
        }).should('create text mixed for arrays named  $',function(){
            
            var expected = _.escape('<div id="1" class="container">\n\nthis is a pig\n<a href="../../">welcome</a>\n</div>\n');
            var actual = _.escape(_.js2xml({
               div:{
                    $id: 1,
                    $class: 'container',
                    $:["this is a pig", {
                        a:{$href:'../../',$:'welcome'}
                    }]
                }
            }));
            equals(expected, actual, 'with attributes and text\n');
            
        }).should('create an xml list for each  $',function(){
            
            var expected = _.escape('<div>hello</div>\n<div>world</div>\n');
            var actual = _.escape(_('.*',[
                {div:'hello'},
                {div:'world'}
            ]).x());
            equals(expected, actual, 'with attributes and text\n');
            
        }).should('return mapped array and chain into xml',function(){
            
            var expected = _.escape('<a href="chris">chris</a>\n<a href="thatcher">thatcher</a>\n');
            var actual = _.escape( _('.*',[
                {name:'chris'},
                {name:'thatcher'}
            ]).map(function(){
                return {a:{$href:this.name, $:this.name}};
            }).x());
            equals( actual, expected, 'returned expected xml');
            
        }).should('render the template multiple times with different data', function(){
            
			$.ajax({
                url:'data/template_00.json',
                dataType:'html',
                async:false,
                success: function(xml){
                    var template = $(xml);
                    var rendered = _.e3x(template, {
                        description: 'this is a pig! oink, oink!',
                        msg:'hello world'
                    });
                    ok(rendered, _.escape($(rendered).html()));
                    
                    rendered = _.e3x(template, {
                        description: 'this is a cow! moo, moo!',
                        msg:'goodbye cruel world'
                    });
                    ok(rendered, _.escape($(rendered).outerHTML()));
                }
            });
            
		}).should('render the template and iterate list', function(){
            
			$.ajax({
                url:'data/template_01.json',
                dataType:'html',
                async:false,
                success: function(xml){
                    var template = $(xml);
                    var rendered = _.e3x(template, {
                        _:_,//include jspath
                        todo: ['wash socks', 'finish taxes', 'sleep in']
                    });
                    ok(rendered, _.escape($(rendered).outerHTML()));
                }
            });
            
		}).should('render multiple templates', function(){
            
			$.ajax({
                url:'data/template_02.json',
                dataType:'html',
                async:false,
                success: function(xml){
                    var template = $(xml);
                    var rendered = _.e3x(template, {
                        _:_,//include jspath
                        title:'Do or Die!',
                        todo: [{
                            note:'wash socks',
                            duedate: '9/11/09'
                        },{ 
                            note:'finish taxes',
                            duedate: '9/12/09'
                        },{
                            note:'sleep in',
                            duedate: '9/13/09'
                       }]
                    });
                    ok(rendered, _.escape($(rendered).outerHTML()));
                }
            });
            
		});
			
	}
    
})(jsPath);
