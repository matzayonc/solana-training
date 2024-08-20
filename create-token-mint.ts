import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
  airdropIfRequired,
} from "@solana-developers/helpers";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

// const keypair = Keypair.generate();
// addKeypairToEnvFile(keypair, "SECRET");

const user = getKeypairFromEnvironment("SECRET");
// await airdropIfRequired(connection, user.publicKey, 2, 1);

console.log(user.publicKey.toString());

const mint = await createMint(connection, user, user.publicKey, null, 2);

const link = getExplorerLink("address", mint.toString(), "devnet");

console.log(`Mint: ${link.toString()}`);
