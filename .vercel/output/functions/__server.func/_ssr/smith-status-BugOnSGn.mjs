import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/smith-status-BugOnSGn.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSmithStatus_createServerFn_handler = createServerRpc({
	id: "b32cb844387607479c01b5aee189be7b79c9c375a2ab2c51d11d96584a0502f1",
	name: "getSmithStatus",
	filename: "src/lib/smith-status.ts"
}, (opts) => getSmithStatus.__executeServer(opts));
var getSmithStatus = createServerFn({ method: "GET" }).handler(getSmithStatus_createServerFn_handler, () => {
	return { available: Boolean(process.env.XAI_API_KEY) };
});
//#endregion
export { getSmithStatus_createServerFn_handler };
