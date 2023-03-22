import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  generateUUID() {
    return randomUUID();
  }

  async hashify(data: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  async assertHash(data: string, hash: string) {
    return await bcrypt.compare(data, hash);
  }
}
