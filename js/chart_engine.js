

exports.get_chart_data = function(count) {
	count = count || 1;
	var deltaY1, deltaY2;
	for (var i = 0; i < count; i++) {
		time.setTime(time.getTime()+ updateInterval);
		deltaY1 = .5 + Math.random() *(-.5-.5);
		deltaY2 = .5 + Math.random() *(-.5-.5);

	// adding random value and rounding it to two digits. 
	yValue1 = Math.round((yValue1 + deltaY1)*100)/100;
	yValue2 = Math.round((yValue2 + deltaY2)*100)/100;

	// pushing the new values
	dataPoints1.push({
		x: time.getTime(),
		y: yValue1
	});
	dataPoints2.push({
		x: time.getTime(),
		y: yValue2
	});
	}

	// updating legend text with  updated with y Value 
	chart.options.data[0].legendText = " Company A  $" + yValue1;
	chart.options.data[1].legendText = " Company B  $" + yValue2; 
	chart.render();
}


exports.period_event = function(io)
{
    var time = new Date;
    var deltaY1=0, deltaY2=0;
    var yValue1=0,yValue2=0;
    var dataPoints1=[],dataPoints2=[];
    deltaY1 = .5 + Math.random() *(-.5-.5);
	deltaY2 = .5 + Math.random() *(-.5-.5);

	// adding random value and rounding it to two digits. 
	yValue1 = Math.round((yValue1 + deltaY1)*100)/100;
	yValue2 = Math.round((yValue2 + deltaY2)*100)/100;

	// pushing the new values
     /*
	dataPoints1.push({
		x: time.getTime(),
		y: yValue1
	});
	dataPoints2.push({
		x: time.getTime(),
		y: yValue2
	});
    io.emit('some event', {'p1':dataPoints1,'p2':dataPoints2});
   */
    io.emit('some event', {
        'p1':{x: time.getTime(),y: yValue1},
        'p2':{x: time.getTime(),y: yValue2}}
    );
    
    console.log(time.toJSON());     
}
