import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { BlockViewComponent } from '../../component/block-view/block-view.component';
@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent implements OnInit {

  public blocks = [];
  constructor(private blockChainService: BlockchainService)  { 
    this.blocks = blockChainService.getBlocks();
    console.log(JSON.stringify(this.blocks, null, 2));
  }

  ngOnInit(): void {
  }

}
