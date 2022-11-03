# cogo-admin


## Installation
Use `pnpm install` to install all dependencies

##
- Use `cd packages/<package-name>` & `pnpm dev` to run individual projects
- Use `pnpm --recursive run dev` for running multiple packages. [Learn More](https://pnpm.io/cli/recursive)

## Port series for admin modules
Admin modules are spread accross `40xx` port series. Following sub-series are assigned to module groups -
- Rate Management: `4021 to 4029` series, `4020` is reserved for rate-commons
- Shipment: `4031 to 4039` series, `4030` is reserved for shipment-commons
- Business Finance: `4041 to 4049` series, `4040` is reserved for bf-commons
- Platform Tools: `4091 to 4099` series, `4090` is reserved for platform-tool-commons


