import { Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from './dto/pagination-query.dt';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto){
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  findAll({limit, offset}: PaginationQueryDto) {
    return this.productsRepository.find({skip: offset, take: limit, order: {name: 'ASC'}});
  }

  findByName(name: string) {
    return this.productsRepository.findBy({name:name});
  }

  findByCategory(category: string) {
    return this.productsRepository.findBy({category:category});
  }

  findOne(id: number) {
    return this.productsRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update({id}, updateProductDto);
  }

  delete(id: number) {
    try {
      return this.productsRepository.delete({ id });
    } catch (err) {
      return {
        status: err.status,
        error: err.message,
      };
    }
  }

}
