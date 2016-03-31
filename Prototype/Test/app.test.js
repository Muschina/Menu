describe('app run', function(){
	it('class page exist', function() {
		var app = require('./../Scripts/app.js');
		if(!app.Page.ok) throw new Error('module didn`t export ok');
	});
});