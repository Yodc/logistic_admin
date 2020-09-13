
$(document).ready(function () {

	var methods = {
		pageInit: function pageInit() {
            getDataWork();
        },
        getDataWork : getDataWork = () =>{
            let html = `
                    <div class="col-xl-4 col-md-6 mb-2" id="work-1">
                        <div class="card border-left-secondary shadow h-100 py-2">
                            <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                <div class="text-xl font-weight-bold text-primary text-uppercase mb-1">Yod CO,TH</div>
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">From : B</div>
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">To : A</div>
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">Date of work : 2020-02-02
                                </div>
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">Price : 100$</div>
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
                applyCardListeners();

        },
        applyCardListeners : applyCardListeners = () =>{
            $('#work-1').off('click');
            $('#work-1').on('click',()=>{
                $('#form_invoice').html("");
                $('#form_panking_list').html("");

                $('#workModal').modal('show');

            });
        },
        applyButtonListeners : applyButtonListeners = () =>{
            
            $('#add_invoice').off('click');
            $('#add_invoice').on('click',()=>{
                renderInvioceDetail();
            });

            $('#add_packing').off('click');
            $('#add_packing').on('click',()=>{
                renderPackingListDetail();
            });

        },
        renderPackingListDetail: renderPackingListDetail = ()=>{
            let html = `
            <div style="border-width: 1px;border-style: solid;padding: 5px;margin-top: 10px;">
                <div class="row">

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Carton</label>
                            <input type="text" class="form-control" id="po_no" placeholder="Carton">
                        </div>
                    </div>

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Carton No.</label>
                            <input type="text" class="form-control" id="part_no" placeholder="Carton No.">
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">P/O No.</label>
                            <input type="text" class="form-control" id="desc" placeholder="P/O No.">
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">P/N</label>
                            <input type="text" class="form-control" id="q_ty" placeholder="P/N">
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-xl-3 col-md-3 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Description</label>
                            <input type="text" class="form-control" id="unit_price" placeholder="Description">
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-3 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Quantity pcs</label>
                            <input type="text" class="form-control" id="amount" placeholder="Amount (USD)">
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-3 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Net Weight kg</label>
                            <input type="text" class="form-control" id="unit_lenght" placeholder="Net Weight kg">
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-3 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Gross Weight kg</label>
                            <input type="text" class="form-control" id="total_lenght" placeholder="Gross Weight kg">
                        </div>
                    </div>

                </div>
            </div>
            `;
            $('#form_packing_list').append(html);
        },
        renderInvioceDetail: renderInvioceDetail = () =>{
            let html = `
            <div style="border-width: 1px;border-style: solid;padding: 5px;margin-top: 10px;">
                <div class="row">

                    <div class="col-xl-4 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">P/O No.</label>
                            <input type="text" class="form-control" id="po_no" placeholder="P/O No.">
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Part No.</label>
                            <input type="text" class="form-control" id="part_no" placeholder="Path No.">
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Description</label>
                            <input type="text" class="form-control" id="desc" placeholder="Description">
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Q'ty (pcs)</label>
                            <input type="text" class="form-control" id="q_ty" placeholder="Q'ty (pcs)">
                        </div>
                    </div>

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Unit price</label>
                            <input type="text" class="form-control" id="unit_price" placeholder="Unit price">
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-4 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Amount (USD)</label>
                            <input type="text" class="form-control" id="amount" placeholder="Amount (USD)">
                        </div>
                    </div>

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="Unit lenght">
                            <label for="exampleFormControlInput1">Date</label>
                            <input type="text" class="form-control" id="unit_lenght" placeholder="Unit lenght">
                        </div>
                    </div>

                    <div class="col-xl-2 col-md-2 mb-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Total lenght</label>
                            <input type="text" class="form-control" id="total_lenght" placeholder="Total lenght">
                        </div>
                    </div>

                </div>
            </div>
            `;
            $('#form_invoice').append(html);
            
        }
	};
	var state = {
          };
          
    methods.pageInit();
    methods.applyButtonListeners();
	
	
});