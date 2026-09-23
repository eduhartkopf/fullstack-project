import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(filters: FindProductsDto) {
    const query = this.productRepository.createQueryBuilder('product');

    if (filters.name) {
      query.andWhere('product.name LIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }

    if (filters.maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }
    return query.getMany();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);

    return this.productRepository.save(newProduct);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: Number(id),
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return this.productRepository.remove(product);
  }
}
