// 表示这是一个文本元素
const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT')
// 表示根节点
const TAG_ROOT = Symbol.for('TAG_ROOT')
// 表示原生节点
const TAG_HOST = Symbol.for('TAG_HOST')
// 表示文本节点
const TAG_TEXT = Symbol.for('TAG_TEXT')

function createElement(type, config, ...children) {
    return {
        type,
        props: {
            ...config,
            children: children.map(child => {
                // 对文本类型的元素进行兼容处理
                return typeof child === 'object' ? child : {
                    type: ELEMENT_TEXT,
                    props: {
                        text: child,
                        children: []
                    }
                }
            }),
        },

    }
}