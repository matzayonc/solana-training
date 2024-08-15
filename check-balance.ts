import "dotenv/config";
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

const lamports = 7 * (10 ** 8); // 0.7 SOL
// await airdropIfRequired(connection, keypair.publicKey, lamports, lamports);

const balance = await connection.getBalance(keypair.publicKey);
console.log('Checking balance of address:', keypair.publicKey.toBase58(), 'Balance:', balance);
console.log('Balance in SOL:', balance / (10 ** 9));

