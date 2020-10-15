$(document).ready(function () {

    var state = {
        delId : null,
    }

    const URL = {
        invoice : "/invoices",
        task : "/tasks"
    }

	var methods = {
		pageInit: function pageInit() {
            getDataWork();
        },
        getDataWork : getDataWork = () =>{
            $.ajax({
                url: restfulURL + URL.task,
                type:"get",
                dataType:"json",
                success:function(data){
                    data.data.map((item,idx)=>{
                        let html = `
                            <div class="col-xl-4 col-md-6 mb-2" id="work-${item.invoice.invoice_id}">
                                <div class="card border-left-secondary shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-xl font-weight-bold text-primary text-uppercase mb-1">${item.invoice.company_name}</div>
                                        <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">Stage : ${item.stage.stage_name}</div>
                                        <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">From : ${item.invoice.from}</div>
                                        <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">To : ${item.invoice.send_to}</div>
                                        <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">Date of work : ${item.invoice.date}</div>
                                        <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">Price : ${item.invoice.price}</div>
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-briefcase fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                    `;
                    $('#card_work').append(html);
                    if(item.stage_id != 1){
                        $('#del-task').hide();
                    }
                    applyCardListeners(item.task_id);
                    });
                }
            });
        },
        applyCardListeners : applyCardListeners = (task_id) =>{
            $(`#work-${task_id}`).off('click');
            $(`#work-${task_id}`).on('click',()=>{
                $('#form_invoice').html("");
                $('#form_panking_list').html("");

                $('#workModal').modal('show');
                getCardData(task_id);
            });
        },
        getCardData : getCardData = (task_id) =>{
            clearDataInModal();
            $.ajax({
                url: restfulURL + URL.task + `/${task_id}`,
                type:"get",
                dataType:"json",
                success:function(data){
                   if(data.status == 200){
                       data = data.data;

                        if(data.invoice.lenght != 0){
                            let dataInvoice = data.invoice;
                            $('#invoice_no').val(dataInvoice.invoice_no);
                            $('#invoice_date').val(dataInvoice.date);
                            $('#invoice_of').val(dataInvoice.invoice_of);
                            $('#invoice_send_to').val(dataInvoice.send_to);
                            $('#invoice_address').val(dataInvoice.address);
                            $('#invoice_company_name').val(dataInvoice.company_name);
                            $('#invoice_ship_by').val(dataInvoice.shipper_by);
                            $('#invoice_from').val(dataInvoice.from);
                            if(dataInvoice.details.lenght != 0){
                                let dataDetail = dataInvoice.details;
                                console.log(dataDetail);
                                dataDetail.map(item =>{
                                    renderInvioceDetail(item);
                                });
                                
                            }
                       }

                       if(data.packing_list.lenght != 0){
                            let dataPackingList = data.packing_list;
                            $('#p_list_list_no').val(dataPackingList.list_no);
                            $('#p_list_date').val(dataPackingList.date);
                            $('#p_list_of').val(dataPackingList.invoice_of);
                            $('#p_list_send_to').val(dataPackingList.send_to);
                            $('#p_list_address').val(dataPackingList.address);
                            $('#p_list_company_name').val(dataPackingList.company_name);
                            $('#p_list_ship_by').val(dataPackingList.shipper_by);
                            $('#p_list_from').val(dataPackingList.from);
                            if(dataPackingList.details.lenght != 0){
                                let dataDetail = dataPackingList.details;
                                console.log(dataDetail);
                                dataDetail.map(item =>{
                                    renderPackingListDetail(item);
                                });
                                
                            } 
                       }

                   }
                }
            });
        },
        applyButtonListeners : applyButtonListeners = () =>{

            $('#add-task').off('click');
            $('#add-task').on('click',()=>{
                clearDataInModal();
            });
            
            $('#add_invoice').off('click');
            $('#add_invoice').on('click',()=>{
                renderInvioceDetail();
            });

            $('#confirm-del').off('click');
            $('#confirm-del').on('click',()=>{
                $.ajax({
                    url: restfulURL + URL.invoice + `/${state.delId}`,
                    type:"delete",
                    dataType:"json",
                    async:false,
                    success:function(data){
                        if(data.status == 200){
                            console.log("del-success");
                            $('#workModal').madal('hide');
                        }
                    }
                });
            });

            $('#save-task').off('click');
            $('#save-task').on('click',()=>{
                saveTask();
            });

            $('#add_packing').off('click');
            $('#add_packing').on('click',()=>{
                renderPackingListDetail();
            });

        },
        clearDataInModal : clearDataInModal = () =>{
            $('.form-control').val('');
        },
        saveTask : saveTask = () =>{
            let invoice = [];
            invoice.push({
                "invoice_no"            :   $('#invoice_no').val(),
                "date"                  :   $('#invoice_date').val(),
                "invoice_of"            :   $('#invoice_of').val(),
                "invoice_send_to"       :   $('#invoice_send_to').val(),
                "invoice_address"       :   $('#invoice_address').val(),
                "invoice_company_name"  :   $('#invoice_company_name').val(),
                "invoice_ship_by"       :   $('#invoice_ship_by').val(),
                "invoice_from"          :   $('#invoice_from').val()
            });
            let invoiceDetail = [];
            $.each($('.invoice_detail'),function(idx,item){
                let id = $(item).prop('id');

            });


        },
        renderPackingListDetail: renderPackingListDetail = (data = null)=>{
            let html = `
            <div style="border-width: 1px;border-style: solid;padding: 5px;margin-top: 10px;">
                <div class="row p_list_detail"  id = ${data != null ?data.packing_list_detail_id:'new'}>

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Carton</label>
                            <input type="text" class="form-control" id="p_list_carton_head${data != null?'_'+data.packing_list_detail_id:''}" value="${data != null?data.carton_no_head:''}" placeholder="Carton">
                        </div>
                    </div>

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Carton No.</label>
                            <input type="text" class="form-control" id="p_list_carton_no${data != null?'_'+data.packing_list_detail_id:''}" value="${data != null?data.carton_no:''}" placeholder="Carton No.">
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">P/O No.</label>
                            <input type="text" class="form-control" id="p_list_po_no${data != null?'_'+data.packing_list_detail_id:''}" value="${data != null?data.po_no:''}" placeholder="P/O No.">
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">P/N</label>
                            <input type="text" class="form-control" id="p_list_pn${data != null?'_'+data.packing_list_detail_id:''}" value="${data != null?data.pn:''}" placeholder="P/N">
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-xl-3 col-md-3 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Description</label>
                            <input type="text" class="form-control" id="p_list_desc${data != null?'_'+data.packing_list_detail_id:''}" value="${data != null?data.description:''}" placeholder="Description">
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-3 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Quantity pcs</label>
                            <input type="text" class="form-control" id="p_list_quantity_pcs${data != null?'_'+data.packing_list_detail_id:''}" value="${data != null?data.quantity_pcs:''}" placeholder="Amount (USD)">
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-3 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Net Weight kg</label>
                            <input type="text" class="form-control" id="ip_list_net_weight_kg${data != null?'_'+data.packing_list_detail_id:''}" value="${data != null?data.net_weight_kg:''}" placeholder="Net Weight kg">
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-3 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Gross Weight kg</label>
                            <input type="text" class="form-control" id="ip_list_gross_weight_kg${data != null?'_'+data.packing_list_detail_id:''}" value="${data != null?data.gross_weight_kg:''}" placeholder="Gross Weight kg">
                        </div>
                    </div>

                </div>
            </div>
            `;
            $('#form_packing_list').append(html);
        },
        renderInvioceDetail: renderInvioceDetail = (data = null) =>{
            let html = `
            <div style="border-width: 1px;border-style: solid;padding: 5px;margin-top: 10px;">
                <div class="row invoice_detail" id = ${data != null?data.invoice_detail_id:'new'}>

                    <div class="col-xl-4 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">P/O No.</label>
                            <input type="text" class="form-control" id="invoice_po_no${data != null?'_'+data.invoice_detail_id:''}" value="${data != null?data.po_no:''}" placeholder="P/O No.">
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Part No.</label>
                            <input type="text" class="form-control" id="invoice_part_no${data != null?'_'+data.invoice_detail_id:''}" value="${data != null?data.part_no:''}" placeholder="Path No.">
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Description</label>
                            <input type="text" class="form-control" id="invoice_desc${data != null?'_'+data.invoice_detail_id:''}" value="${data != null?data.description:''}" placeholder="Description">
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Q'ty (pcs)</label>
                            <input type="text" class="form-control" id="invoice_q_ty${data != null?'_'+data.invoice_detail_id:''}" value="${data != null?data.q_ty_pcs:''}" placeholder="Q'ty (pcs)">
                        </div>
                    </div>

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Unit price</label>
                            <input type="text" class="form-control" id="invoice_unit_price${data != null?'_'+data.invoice_detail_id:''}" value="${data != null?data.unit_price:''}" placeholder="Unit price">
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-4 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Amount (USD)</label>
                            <input type="text" class="form-control" id="invoice_amount${data != null?'_'+data.invoice_detail_id:''}" value="${data != null?data.amount:''}" placeholder="Amount (USD)">
                        </div>
                    </div>

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="Unit lenght">
                            <label for="exampleFormControlInput1">Date</label>
                            <input type="text" class="form-control" id="invoice_unit_lenght${data != null?'_'+data.invoice_detail_id:''}" value="${data != null?data.unit_lenght:''}" placeholder="Unit lenght">
                        </div>
                    </div>

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Total lenght</label>
                            <input type="text" class="form-control" id="invoice_total_lenght${data != null?'_'+data.invoice_detail_id:''}" value="${data != null?data.total_lenght:''}" placeholder="Total lenght">
                        </div>
                    </div>

                </div>
            </div>
            `;
            $('#form_invoice').append(html);
            
        }
	};
          
    methods.pageInit();
    methods.applyButtonListeners();
	
	
});