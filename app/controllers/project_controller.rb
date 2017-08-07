require 'json'
class ProjectController < ApplicationController
	def linkDatabase
		begin
			rs = {}
			p 'linkDatabaselinkDatabaselinkDatabase'
			p params[:filename]	
			p = Product.new
			p.name = "Some Book"
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		rs[:result] = p.name
		rs[:success] = true
		render :json=>rs
	end

	def getNames
		rs = {}
		begin
			result = []
			# totals = Product.all
			# totals = Product.where(id:1)
			totals = Product.select("id,name")
			# totals = Product.find_by_sql("SELECT id,name FROM products")
			totals.each{|total|
				result << total.attributes
			}
			rs[:success] = true
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		rs[:result] = result.to_xml
		render :json=>rs
	end

	def selectProduct
		id = params[:id]
		rs = {}
		begin
			result = []
			totals = Product.find(id)
			# totals = Product.where(id:params[:id])
			# totals.each{|total|
			# 	result << total.attributes
			# }
			# result << product
			rs[:success] = true
			rs[:result] = totals
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		render :json=>rs
	end

	def modify
		id = params[:id]
		name = params[:name]
		price = params[:price]
		rs = {}
		begin
			result = []
			file = File.new("#{Rails.root}/public/myfile.txt", 'a+')
			file.puts Time.now.to_s + "\n"
			file.puts "modify before \n"
			totals = Product.find(id)
			file.puts "id: " + totals.id.to_s + " name: " + totals.name + " price: " + totals.price + "\n"
			totals.update(name:name,price:price)
			file.puts "modify after \n"
			file.puts "id: " + totals.id.to_s + " name: " + totals.name + " price: " + totals.price + "\n"
			file.close
			rs[:success] = true
			rs[:result] = totals
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		render :json=>rs
	end

	def add
		id = params[:id]
		name = params[:name]
		price = params[:price]
		rs = {}
		begin
			result = []
			# totals = Product.find(id)
			totals  = Product.create(name:name,price:price)
			file = File.new("#{Rails.root}/public/myfile.txt", 'a+')
			file.puts Time.now.to_s + "\n"
			file.puts "add \n"
			file.puts "id: " + totals.id.to_s + " name: " + totals.name + " price: " + totals.price + "\n"
			file.close
			rs[:success] = true
			rs[:result] = totals
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		render :json=>rs
	end

	def delete
		id = params[:id]
		name = params[:name]
		price = params[:price]
		rs = {}
		begin
			# result = []
			Product.destroy(id)
			# totals  = Product.create(name:name,price:price)
			file = File.new("#{Rails.root}/public/myfile.txt", 'a+')
			file.puts Time.now.to_s + "\n"
			file.puts "delete \n"
			file.puts "id: " + id.to_s + " name: " + name + " price: " + price + "\n"
			file.close
			rs[:success] = true
			# rs[:result] = totals
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		render :json=>rs
	end

	# f1 = File.new("file1", "r+")  
	# # Read/write, starting at beginning of file.  
	# f2 = File.new("file2", "w+")  
	# # Read/write; truncate existing file or create a new one.  
	# f3 = File.new("file3", "a+")  
	# # Read/write; start at end of existing file or create a  
	# # new one. 

	def openFile
		rs = {}
		begin
			file = File.new("#{Rails.root}/public/myfile.txt", 'a+')
			file.puts "Hello,sharejs.com.\n"
			file.close
			# File.open("#{Rails.root}/public/myfile.txt", 'a+'){ |f|
			# 	f << "Hello,sharejs.com.\n"
			# }
			rs[:success] = true
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		render :json=>rs
	end

	def deleteFile
		rs = {}
		begin
			# File.new("#{Rails.root}/public/myfile.txt", 'a+')
			File.delete("#{Rails.root}/public/myfile.txt")
			rs[:success] = true
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		render :json=>rs
	end

	def export
		require "spreadsheet"  
		rs = {}
		begin
			book = Spreadsheet::Workbook.new
			rs[:success] = true
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		render :json=>rs
	end

	def import
		begin
			rs = {}
			content = ''
			uploadFile = params[:uploadFile]
			content =  uploadFile.open.read
			content_json =  Hash.from_xml(content).to_json
			# content_json 存数据库...
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		render :json=>'上传成功'
	end

	def parseTest
		rs = {}
		begin
			p 'parseTestparseTestparseTestparseTest'
			str = eval(params[:str])
			rs[:result] = str
			rs[:success] = true
		rescue Exception => e
			rs[:msg] = e.message
			rs[:success] = false
		end
		render :json=>rs
	end


end
