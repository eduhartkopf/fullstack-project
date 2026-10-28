import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(newCategory);
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: Number(id) },
    });

    if (!category) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }

    const productCount = await this.productRepository.count({
      where: {
        category: { id: category.id },
      },
    });

    if (productCount > 0) {
      throw new BadRequestException(
        'No se puede eliminar una categoría que tiene productos asociados',
      );
    }

    return this.categoryRepository.remove(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (
      Object.values(updateCategoryDto).every(
        (value) => value === undefined || value === null,
      )
    ) {
      throw new BadRequestException(
        'Debes enviar al menos un campo para actualizar la categoría',
      );
    }

    const category = await this.categoryRepository.findOne({
      where: { id: Number(id) },
    });

    if (!category) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }

    Object.assign(category, updateCategoryDto);

    return this.categoryRepository.save(category);
  }
}
