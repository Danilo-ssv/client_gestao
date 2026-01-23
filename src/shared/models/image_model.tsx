export interface ImageModel {
  imageOrigin: "none" | "network" | "local",
  urlName: string | null,
  localFile: { path: string, file: File } | null,
}