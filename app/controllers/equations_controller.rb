class EquationsController < ApplicationController
  include Math
  require 'csv'

  def main_page
  end

  def calculate(a,b,c, status_array)
    discriminant = find_discriminant(a, b, c)
      #@answer =  "The discriminant of the equation is negative, there are no roots"
    @vertex = find_vertex(a, b, c)
    case
      when discriminant < 0
        status_array << "Entered values for this parabola are #{a}, #{b}, #{c}. The discriminant of the equation is negative, there are no roots"

      when discriminant > 0
        x1 = (-b + sqrt(discriminant)) / 2*a
        x2 = (-b - sqrt(discriminant)) / 2*a

        status_array << "THE DISCRIMINANT OF THE EQUATION IS #{discriminant} and the values entered are #{a}, #{b}, #{c}. The roots of the equation are #{x1} and #{x2}. The vertex of the parabola should be at the following co-ordinates: X axis at #{@vertex[0]}, Y axis at #{@vertex[1]}"
      when discriminant == 0
        x1 = (-b + sqrt(discriminant)) / 2*a
        status_array << "THE DISCRIMINANT OF THE EQUATION IS #{discriminant} and the values entered are #{a}, #{b}, #{c}. The root of the equation is #{x1}. The vertex of the parabola should be at the following co-ordinates: X axis at #{@vertex[0]}, Y axis at #{@vertex[1]}"
    end  
    @points = additional_points(a, b, c, @vertex)
  end

  def handle_input
    if params[:a_value] || params[:b_value] || params[:c_value]
      a = params[:a_value].to_i
      b = params[:b_value].to_i
      c = params[:c_value].to_i

      calculate(a, b, c)
      render template: "equations/calculate"
     
    elsif params[:file]
      file = params[:file].read
      @array = CSV.parse(file).first
      count = @array.count
      if count % 3 != 0
        (3 - (count % 3)).times do
          @array << 0
        end
        flash.notice = "The number of values supplied in the CSV file was not divisible by 3, so we added #{3 - (count % 3)} additional elements to be able to build the parabola. The arguments supplied now look as follows: #{@array}"
      end

      @total_pairs = []
      @status = []


      @array_split = @array.each_slice(3).each_with_index do |pair, i|
        @total_pairs << calculate(pair[0].to_i, pair[1].to_i, pair[2].to_i, @status)
      end
      render template: "equations/calculate"
    end


  end

  private

  def find_discriminant(a, b, c)
    discriminant=(b*b)-(4*a*c)
  end

  def find_vertex(a, b, c)
    h = -b/(2*a)
    k = a*(h*h) + b*h + c
    [h, k]
  end

  def additional_points(a, b, c, vertex)
    coordinates = []
    (vertex.first-10).upto(vertex.first+10) do |x|
      y = a*(x*x) + b*x + c
      coordinates << {x => y}
    end
    coordinates
  end
end
