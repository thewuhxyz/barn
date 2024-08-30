import { AnchorProvider } from "@coral-xyz/anchor";

export class BarnClient {
  constructor(public provider: AnchorProvider) {}
}