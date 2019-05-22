import axios, { AxiosResponse } from "axios"
import { BlockDetailsResult } from "bitcoin-com-rest"
import { resturl } from "./BITBOX"

export class Block {
  public restURL: string
  constructor(restURL: string = resturl) {
    this.restURL = restURL
  }

  public async detailsByHeight(
    id: number | number[]
  ): Promise<BlockDetailsResult | BlockDetailsResult[]> {
    try {
      // Single block
      if (typeof id === "number") {
        const response: AxiosResponse = await axios.get(
          `${this.restURL}block/detailsByHeight/${id}`
        )
        return response.data

        // Array of blocks.
      } else if (Array.isArray(id)) {
        const options = {
          method: "POST",
          url: `${this.restURL}block/detailsByHeight`,
          data: {
            heights: id
          }
        }
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a number or array of numbers.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async detailsByHash(
    hash: string | string[]
  ): Promise<BlockDetailsResult | BlockDetailsResult[]> {
    try {
      // Single block
      if (typeof hash === "string") {
        const response: AxiosResponse = await axios.get(
          `${this.restURL}block/detailsByHash/${hash}`
        )
        return response.data

        // Array of hashes.
      } else if (Array.isArray(hash)) {
        const options = {
          method: "POST",
          url: `${this.restURL}block/detailsByHash`,
          data: {
            hashes: hash
          }
        }
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
