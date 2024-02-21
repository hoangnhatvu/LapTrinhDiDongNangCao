import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
  Put,
} from '@nestjs/common'
import { UserRole } from 'src/enums/role.enum'
import { AuthGuard } from 'src/guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { storageConfig } from 'src/common/config'
import { fileFilter } from 'src/common/fileFilter'
import { OptionService } from './option.service'
import { CreateOptionDTO, UpdateOptionDTO } from 'src/dtos/option.dto'

@Controller('options')
export class OptionController {
  constructor(private optionService: OptionService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @UseInterceptors(
    FileInterceptor('option_image', {
      storage: storageConfig('option_image'),
      fileFilter,
    }),
  )
  create(@UploadedFile() file: Express.Multer.File, @Body() createOptionDTO: CreateOptionDTO, @Req() req: any) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError)
    }
    return this.optionService.create(
      createOptionDTO,
      req.user_data.id,
      file ? file.destination + '/' + file.filename : null,
    )
  }

  @Put('update')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
  @UseInterceptors(
    FileInterceptor('option_image', {
      storage: storageConfig('option_image'),
      fileFilter,
    }),
  )
  update(
    @Query() query: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @Body() updateOptionDTO: UpdateOptionDTO,
    @Req() req: any,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError)
    }
    return this.optionService.update(
      query.id,
      updateOptionDTO,
      req.user_data.id,
      file ? file.destination + '/' + file.filename : null,
    )
  }
}
