(function(wp) {
    const { addFilter } = wp.hooks;
    const { Fragment } = wp.element;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody } = wp.components;
    const { __ } = wp.i18n;

    /**
     * Add custom inspector controls to the list block
     */
    function addListMarkerInspectorControls(BlockEdit) {
        return function(props) {
            const { name } = props;
            
            // Only apply to core/list blocks (ul/ol)
            if (name !== 'core/list') {
                return wp.element.createElement(BlockEdit, props);
            }

            // Check if it's a ul block (unordered list)
            const { attributes } = props;
            const isUnorderedList = !attributes.ordered;

            if (!isUnorderedList) {
                return wp.element.createElement(BlockEdit, props);
            }

            return wp.element.createElement(
                Fragment,
                {},
                wp.element.createElement(BlockEdit, props),
                wp.element.createElement(
                    InspectorControls,
                    { group: 'styles' }, // スタイルタブに表示されるようにgroup属性を追加
                    wp.element.createElement(
                        PanelBody,
                        {
                            title: __('リストマーク設定', 'list-marker-settings'),
                            initialOpen: false,
                            className: 'list-marker-settings-panel'
                        },
                        wp.element.createElement(
                            'div',
                            { className: 'list-marker-settings-content' },
                            wp.element.createElement(
                                'p',
                                {},
                                __('ここにリストマークの設定項目を追加予定', 'list-marker-settings')
                            )
                        )
                    )
                )
            );
        };
    }

    // Filter the BlockEdit component to add our custom controls
    addFilter(
        'editor.BlockEdit',
        'list-marker-settings/add-inspector-controls',
        addListMarkerInspectorControls
    );

})(window.wp);