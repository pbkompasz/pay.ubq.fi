import { Permit } from "@ubiquibot/permit-generation/types";
import { app } from "../app-state";
import { ensLookup } from "../cirip/ens-lookup";

type EnsParams =
  | {
      element: Element;
      address: string;
      tokenAddress: string;
      tokenView: true;
      networkId: number;
    }
  | {
      element: Element;
      address: string;
      tokenAddress?: undefined;
      tokenView?: false;
      networkId: number;
    };

export async function renderEnsName(claim: Permit, { element, address, tokenAddress, tokenView, networkId }: EnsParams): Promise<void> {
  let href: string = "";
  try {
    const ensName = await ensLookup(address, networkId);
    if (ensName) {
      if (tokenView) {
        href = `${app.getCurrentExplorerUrl(claim)}/token/${tokenAddress}?a=${address}`;
      } else {
        href = `${app.getCurrentExplorerUrl(claim)}/address/${address}"`;
      }
      element.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="${href}">${ensName}</a>`;
    }
  } catch (error) {
    console.error(error);
  }
}
