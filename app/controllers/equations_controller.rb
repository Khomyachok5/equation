class EquationsController < ApplicationController
  #include Math
  require 'csv'
  require 'equation_solver'

  def main_page
  end

  def handle_input
    @status = []
    @total_pairs = []
    if params[:a_value] || params[:b_value] || params[:c_value]
      a = params[:a_value]
      b = params[:b_value]
      c = params[:c_value]

      if handle_form(a, b, c)
      else
        return (flash.alert = "One of the requirements for building parabola was not satisfied. Please review the requirements and rectify input values: \nThe value of \"a\" parameter can\'t be nill. \n Input values must be numbers."; redirect_to root_path)
      end

     
    elsif params[:file]
      file = params[:file].read
      if !EquationSolver.check_file_validity(file)
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
        result = EquationSolver.calculate(pair[0], pair[1], pair[2], @status)
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

  def handle_form(a, b, c)
    @status = []
    @total_pairs = []
    result = EquationSolver.calculate(a, b, c, @status)
    if result != false
      @total_pairs << result
    else
        return false
    end
    @no_common_chart = 1
    render template: "equations/calculate"
  end
end