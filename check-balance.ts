import "dotenv/config";
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

const lamports = 7 * (10 ** 8); // 0.7 SOL
// await airdropIfRequired(connection, keypair.publicKey, lamports, lamports);

const address = new PublicKey('2XCBRmosLs2KovcRXe2Kf6yp9J3M2SAiysdMHLD7FnqH')

const balance = await connection.getBalance(address);
console.log('Checking balance of address:', address.toBase58(), 'Balance:', balance);
console.log('Balance in SOL:', balance / (10 ** 9));

