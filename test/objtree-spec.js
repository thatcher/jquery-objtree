(function(_){
  	// RSpec/Bacon Style
	with (jqUnit) {
		
		//tests basic init functionality
		describe('jQuery jsPath ObjTree', '_.xml2js', {
			before: function(){
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
        }).should('create a template for tmpl  $',function(){
            var expected = [{a:{$href:'chris'}},{a:{$href:'thatcher'}}];
            var actual = _('.*',[
                {name:'chris'},
                {name:'thatcher'}
            ]).tmpl({a:{$href:'|:name|'}});
            equals(actual.length, 2, 'returned the same number of templates');
            equals(actual[0].a.$href, expected[0].a.$href, 'replace the item with the named value');
            equals(actual[1].a.$href, expected[1].a.$href, 'replace the item with the named value');
        }).pending('should do something awesome', function(){
			// It doesnt matter what you put here it wont be run until
			// you change this to an actual spec
			ok(false);
		});
			
	}
    
})(jsPath);
