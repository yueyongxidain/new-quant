import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Form } from 'quant-ui';
import PageHeaderLayout from "@/layouts/PageHeaderLayout"
class FileName extends Component {
    render() {
        return (
            <PageHeaderLayout  >
                <Card className="hover-shadow">
                    123
                </Card>
            </PageHeaderLayout>)
    }
}
export default connect(({ manage, loading }) => {
    return {

    }
})(
    Form.create()(FileName)
)