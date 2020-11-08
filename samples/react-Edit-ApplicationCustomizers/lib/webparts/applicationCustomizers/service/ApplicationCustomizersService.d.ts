import "@pnp/sp/webs";
import "@pnp/sp/user-custom-actions";
export default class ApplicationCustomizersService {
    /**
     * fetchAllApplictionCustomizers
     */
    fetchAllApplictionCustomizers: (webURL: string) => Promise<any>;
    /**
     * getAllSiteCollection
     */
    getAllSiteCollection: () => Promise<any>;
    /**
     * updateApplicationCustomizer
     */
    updateApplicationCustomizer: (webURL: string | number, selectedID: string, updateJSON: any) => Promise<void>;
}
//# sourceMappingURL=ApplicationCustomizersService.d.ts.map