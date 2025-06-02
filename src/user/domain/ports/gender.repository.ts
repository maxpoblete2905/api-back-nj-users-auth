import { Gender } from '../model/gender.model';

export abstract class GenderRepository {
  abstract findById(id: number): Promise<Gender | null>;
}
