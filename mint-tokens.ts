import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
  airdropIfRequired,
} from "@solana-developers/helpers";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";

const HOW_MANY_CENTS = 100;

const connection = new Connection(clusterApiUrl("devnet"));
const mintAuthority = getKeypairFromEnvironment("SECRET");

const mint = new PublicKey("DMfNniM6iMWcLB4aXp5kbxneJQt6YXeD5JCxuoc3RHh1");
const recipient = new PublicKey("8QKrGYdHpK4pQZR1w8B9wPLHo4Zp8A6tQbD5BVRtY7Zm");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  mintAuthority,
  mint,
  recipient
);

const transaction = await mintTo(
  connection,
  mintAuthority,
  mint,
  tokenAccount.address,
  mintAuthority.publicKey,
  7 * HOW_MANY_CENTS
);

console.log(`Token account: ${tokenAccount.address.toString()}`);

const link = getExplorerLink("transaction", transaction, "devnet");

console.log(`Explorer link: ${link}`);
