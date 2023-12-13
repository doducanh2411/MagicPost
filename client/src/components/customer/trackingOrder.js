import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

export default function OrderTracking({ data }) {
    console.log(data);
    if (!data) {
        return null;
    }

    return (
        <Container className="lookUpContainer">
            <Row>
                <Col>
                    <Row><strong>Số hiệu bưu gửi</strong> </Row>
                    <Row><p className='m-0'>{data.orderID}</p></Row>
                </Col>

                <Col>
                    <Row><strong>Địa chỉ gửi</strong> </Row>
                    <Row><p className='m-0'>{data.sender?.address?.province?.name}</p></Row>
                </Col>

                <Col>
                    <Row><strong>Địa chỉ nhận</strong> </Row>
                    <Row><p className='m-0'>{data.receiver?.address?.province?.name}</p></Row>
                </Col>

                <Col>
                    <Row><strong>Khối lượng</strong> </Row>
                    <Row><p className='m-0'>{data.goodsList?.[0]?.realWeight}</p></Row>
                </Col>

                <Col>
                    <Row><strong>Trạng thái</strong> </Row>
                    <Row><p className='m-0'>{data.processes?.[0]?.status}</p></Row>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table hover className='mt-3'>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Vị trí hiện tại</th>
                                <th>Điểm tiếp theo</th>
                                <th>Ngày</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            {data.processes?.map((process, index) => (
                                <tr key={index}>
                                    <td>{process?.processID}</td>
                                    <td>{process?.currentRoutingPoint?.address?.detail}</td>
                                    <td>{process?.nextRoutingPoint?.address?.detail}</td>
                                    <td>{process?.arrivedTime}</td>
                                    <td>{process?.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
