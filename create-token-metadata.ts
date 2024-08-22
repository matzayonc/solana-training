import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
  airdropIfRequired,
} from "@solana-developers/helpers";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import {
  createCreateMetadataAccountV3Instruction,
  DataV2,
} from "@metaplex-foundation/mpl-token-metadata";

const connection = new Connection(clusterApiUrl("devnet"));

// const keypair = Keypair.generate();
// addKeypairToEnvFile(keypair, "SECRET");

const user = getKeypairFromEnvironment("SECRET");
// await airdropIfRequired(connection, user.publicKey, 2, 1);

const METADATA_PROGRAM = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
const mint = new PublicKey("9vY2DrGajn5K7PnHMCG5h5Cq28Dg9WjpX7VYpDrHtZn3");

const metadata: DataV2 = {
  name: "Lamas",
  symbol: "LAM",
  uri: "https://raw.githubusercontent.com/solana-developers/professional-education/main/labs/sample-token-metadata.json",
  sellerFeeBasisPoints: 500,
  creators: null,
  collection: null,
  uses: null,
};

const [metadataAddress, _] = PublicKey.findProgramAddressSync(
  [Buffer.from("metadata"), METADATA_PROGRAM.toBuffer(), mint.toBuffer()],
  METADATA_PROGRAM
);

const tx = new Transaction();

const createMetadateInstruction = createCreateMetadataAccountV3Instruction(
  {
    metadata: metadataAddress,
    mint,
    mintAuthority: user.publicKey,
    payer: user.publicKey,
    updateAuthority: user.publicKey,
  },
  {
    createMetadataAccountArgsV3: {
      collectionDetails: null,
      data: metadata,
      isMutable: true,
    },
  }
);

tx.add(createMetadateInstruction);

await sendAndConfirmTransaction(connection, tx, [user]);

const tokenMintLink = getExplorerLink("address", mint.toString(), "devnet");
console.log(`Mint: ${tokenMintLink.toString()}`);
