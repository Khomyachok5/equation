$(function() {
  console.log( "ready!" );
  var chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        y: 'y',
        columns: [
          ['x', $('#vertex_x').data('x'),
           $('#element_name_0').data('x'),
           $('#element_name_1').data('x'), 
           $('#element_name_2').data('x'), 
           $('#element_name_3').data('x'), 
           $('#element_name_4').data('x'),
           $('#element_name_5').data('x'),
           $('#element_name_6').data('x'),
           $('#element_name_7').data('x'),
           $('#element_name_8').data('x'),
           $('#element_name_9').data('x'),
           $('#element_name_10').data('x'),
           $('#element_name_11').data('x'),
           $('#element_name_12').data('x'),
           $('#element_name_13').data('x'),
           $('#element_name_14').data('x'),
           $('#element_name_15').data('x'),
           $('#element_name_16').data('x'),
           $('#element_name_17').data('x')],
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