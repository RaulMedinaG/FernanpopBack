import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationQueryDto } from './dto/pagination-query.dt';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto): Promise<Product[]> {
    return this.productsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    try {
      return this.productsService.findByName(name);
    } catch (error) {
      throw error;
    }
    
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    try {
      return this.productsService.findByCategory(category);
    } catch (error) {
      throw error;
    }
    
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
