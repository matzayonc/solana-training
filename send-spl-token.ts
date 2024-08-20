import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  transfer,
} from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
  airdropIfRequired,
} from "@solana-developers/helpers";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET");

const mint = new PublicKey("DMfNniM6iMWcLB4aXp5kbxneJQt6YXeD5JCxuoc3RHh1");
const recipient = new PublicKey("8QKrGYdHpK4pQZR1w8B9wPLHo4Zp8A6tQbD5BVRtY7Zm");

const userTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  mint,
  user.publicKey
);

const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  mint,
  recipient
);

const transaction = await transfer(
  connection,
  user,
  userTokenAccount.address,
  recipientTokenAccount.address,
  user.publicKey,
  7 * 100
);

const link = getExplorerLink("transaction", transaction, "devnet");

console.log(`Explorer link: ${link}`);
