
class VueReactiveAdaptor extends ProxyAdaptor {
    initialize() {
        this.scopeManager.registerRenderHooks((render, id) => {
            let effect = new ReactiveEffect(
                () => {
                    render();
                },
                () => {
                    effect.stop();
                    this.renderIds(id);
                }
            );
            effect.run();
        });
    }

    create(data, readonly) {
        if (readonly) {
            return rd(data);
        }
        return reactive(data);
    }
}

const scopeManager = window.scopeManager = configuration.get('instances.scopeManager');
scopeManager.adaptProxy(new VueReactiveAdaptor());