$(function() {
  console.log( "ready!" );
  var x_array = [];
  var y_array = [];
  x_array.push('x', $('#vertex_x').data('x'))
  var index;
  var a =  Array.prototype.slice.call($('.element_name'), 0)
  for (index = 0; index < a.length; ++index) {
    x_array.push($(a[index]).data('x'));
  }
  var chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        y: 'y',
        columns: [
          x_array,
          ['y', $('#vertex_y').data('y'),
            $('#element_y_name_0').data('y'), 
            $('#element_y_name_1').data('y'),
            $('#element_y_name_2').data('y'),
            $('#element_y_name_3').data('y'),
            $('#element_y_name_4').data('y'),
            $('#element_y_name_5').data('y'),
            $('#element_y_name_6').data('y'),
            $('#element_y_name_7').data('y'),
            $('#element_y_name_8').data('y'),
            $('#element_y_name_9').data('y'),
            $('#element_y_name_10').data('y'),
            $('#element_y_name_11').data('y'),
            $('#element_y_name_12').data('y'),
            $('#element_y_name_13').data('y'),
            $('#element_y_name_14').data('y'),
            $('#element_y_name_15').data('y'),
            $('#element_y_name_16').data('y'),
            $('#element_y_name_17').data('y')
          ]
        ]
      }
  })
});