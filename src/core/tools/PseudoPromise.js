export class PseudoPromise{
	constructor( callback ){
		this.resolvers = []
		this.rejecters = []

		if(callback){
			callback( this.onResolve, this.onReject )
		}
	}

	then( callback ){
		this.resolvers.push(callback)
		return this
	}

	subscribe(callback){
		return this.then(callback)
	}

	catch( callback ){
		this.rejecters.push(callback)
		return this
	}

	callAll(callbacks, ...data){
		for(let i=0; i < callbacks.length ; i++){
			callbacks[i](...data)
		}
	}

	onResolve( ...data ){
		this.callAll(this.resolvers, ...data)
	}

	onReject( ...data ){
		this.callAll(this.rejecters, ...data)
	}
}
