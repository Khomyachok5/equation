class EquationsController < ApplicationController
  include Math
  require 'csv'

  def main_page
  end

  def calculate(a,b,c, status_array)
    if check_arguments(a, b, c) == false
      return false
    end

    a = a.to_f
    b = b.to_f
    c = c.to_f

    discriminant = find_discriminant(a, b, c)
    @vertex = find_vertex(a, b, c)
    case
      when discriminant < 0
        status_array << "Entered values for this parabola are #{a}, #{b}, #{c}. The discriminant of the equation is negative, there are no roots. The vertex of the parabola should be at the following co-ordinates: X axis at #{@vertex[0]}, Y axis at #{@vertex[1]}"

      when discriminant > 0
        x1 = (-b + sqrt(discriminant)) / 2*a
        x2 = (-b - sqrt(discriminant)) / 2*a

        status_array << "THE DISCRIMINANT OF THE EQUATION IS #{discriminant} and the values entered are #{a}, #{b}, #{c}. The roots of the equation are #{x1} and #{x2}. The vertex of the parabola should be at the following co-ordinates: X axis at #{@vertex[0]}, Y axis at #{@vertex[1]}"
      when discriminant == 0
        x1 = (-b + sqrt(discriminant)) / 2*a
        status_array << "The values entered are #{a}, #{b}, #{c}. The discriminant of the equation is #{discriminant}. The root of the equation is #{x1}. The vertex of the parabola should be at the following co-ordinates: X axis at #{@vertex[0]}, Y axis at #{@vertex[1]}"
    end
    @points = additional_points(a, b, c, @vertex)
  end

  def handle_input
    @status = []
    @total_pairs = []
    if params[:a_value] || params[:b_value] || params[:c_value]
      a = params[:a_value]
      b = params[:b_value]
      c = params[:c_value]

      result = calculate(a, b, c, @status)
      if result != false
        @total_pairs << result
      elsif result == false
          return (flash.alert = "One of the requirements for building parabola was not satisfied. Please review the requirements and rectify input values: \n
            The value of \"a\" parameter can\'t be nill. \n 
            Input values must be numbers."; redirect_to root_path)
      end
      @no_common_chart = 1
      render template: "equations/calculate"
     
    elsif params[:file]
      file = params[:file].read
      if !check_file_validity(file)
        return (flash.alert = "Invalid CSV file"; redirect_to root_path)
      else
        @array = CSV.parse(file).first
      end
      count = @array.count
      if count % 3 != 0
        (3 - (count % 3)).times do
          @array << 0
        end
        flash.notice = "The number of values supplied in the CSV file was not divisible by 3, so we added #{3 - (count % 3)} additional elements to be able to build the parabola. The arguments supplied now look as follows: #{@array}"
      elsif count == 0
        return (flash.alert = "An empty file was submitted. Please submit a file with valid values"; redirect_to root_path)
      end

      @array_split = @array.each_slice(3).each_with_index do |pair, i|
        result = calculate(pair[0], pair[1], pair[2], @status)
        if result != false
          @total_pairs << result
        elsif result == false
          return (flash.alert = "Values in the CSV file are split into pairs of three digits where each one corresponds to \"a\", \"b\" and \"c\" parameter to the function. The value of \"a\" parameter can\'t be nill. Please change it to a different digit"; redirect_to root_path)
        end
      end
      render template: "equations/calculate"
    else
      return (flash.alert = "Neither the values for the form nor CSV file were submitted. Please, fill in the form or supply a CSV file with values"; redirect_to root_path)
    end


  end

  private

  def check_arguments(a,b,c)
    if a == '0' || a == 0.0 || !numeric?(a) || !numeric?(b) || !numeric?(c)
      return false
    end
  end

  def find_discriminant(a, b, c)
    discriminant=(b*b)-(4*a*c)
  end

  def find_vertex(a, b, c)
    h = (-b)/(2*a)
    k = a*(h*h) + b*h + c
    [h, k]
  end

  def additional_points(a, b, c, vertex)
    coordinates = []
    #v_int = vertex.first.to_i
    ((vertex.first-15)..(vertex.first+15)).step(1).each do |x| x = x.round(2)
      y = (a*(x*x) + b*x + c).round(2)
      #y = (y * 1000).floor / 1000.0
      coordinates << {x => y}
    end
    coordinates
  end

  def numeric?(value)
    Float(value) != nil rescue false
  end

  def check_file_validity(file)
    begin
      CSV.parse(file).first
      true 
    rescue CSV::MalformedCSVError
      false
    end
  end
end