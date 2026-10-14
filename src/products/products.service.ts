import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(filters: FindProductsDto) {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

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
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: createProductDto.categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoría con id ${createProductDto.categoryId} no encontrada`,
      );
    }

    const newProduct = this.productRepository.create({
      name: createProductDto.name,
      price: createProductDto.price,
      stock: createProductDto.stock,
      category: category,
    });

    return this.productRepository.save(newProduct);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    const { categoryId, ...productChanges } = updateProductDto;

    if (categoryId !== undefined) {
      const category = await this.categoryRepository.findOne({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new NotFoundException(
          `Categoría con id ${categoryId} no encontrada`,
        );
      }

      product.category = category;
    }

    Object.assign(product, productChanges);

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
