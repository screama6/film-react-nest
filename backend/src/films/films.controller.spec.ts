import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilms = [
    { id: 'test-id-1', title: 'Film One', director: 'Director One' },
    { id: 'test-id-2', title: 'Film Two', director: 'Director Two' },
  ];

  const mockFilm = {
    id: 'test-id-3',
    title: 'Film Three',
    director: 'Director Three',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn().mockResolvedValue(mockFilms),
        findById: jest.fn().mockResolvedValue(mockFilm),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  describe('.getFilms()', () => {
    it('should return all films and call findAll() once', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(mockFilms);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when findAll() throws an exception', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new Error('Service error'));

      await expect(controller.findAll()).rejects.toThrow('Service error');
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('.getFilmSchedule()', () => {
    it('should return a single film and call findById() with the correct ID', async () => {
      const params: string = 'test-id-3';
      const result = await controller.findById(params);

      expect(result).toEqual(mockFilm);
      expect(service.findById).toHaveBeenCalledWith(params);
      expect(service.findById).toHaveBeenCalledTimes(1);
    });

    it('should handle NotFoundException when findById() throws an exception', async () => {
      const params: string = 'non-existing-id';
      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(new NotFoundException('Film not found'));

      await expect(controller.findById(params)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findById).toHaveBeenCalledWith(params);
      expect(service.findById).toHaveBeenCalledTimes(1);
    });
  });
});
