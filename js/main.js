var mainData = {
	error_code: 0,
	result: 'ok',
	data:{
		list: [
			{
				name: "z1",
				age: 28,
				avatar: 'http://pic.qyer.com/public/place/theme/2014/05/05/1399279859/388x200'
			},
			{
				name: 'l1',
				age: 29,
				avatar: 'http://pic.qyer.com/public/place/theme/2014/05/05/1399278181/192x405'
			}
		],
		page: 28,
		other: {
			author: 'liujc',
			age: 28
		}
	},
	pictures: [
		{
			img: 'http://pic.qyer.com/public/place/theme/2014/05/05/1399278181/192x405',
			size: '192x405'
		},
		{
			img: 'http://pic.qyer.com/public/place/theme/2014/05/05/1399278181/388x200',
			size: '388x200'
		},
		{
			img: 'http://pic.qyer.com/public/place/theme/2014/05/05/1399278181/388x200',
			size: '388x200'
		}
	]
}


// var a = new Analysis({
// 	data: mainData
// });
//_.$('#example').innerHTML = a.innerHTML;



require(['js/util'], function(_){
	_.bind(
		'#example1',
		'click',
		function(e){
			console.log('success')
		},
		'.c1'
	)
})














