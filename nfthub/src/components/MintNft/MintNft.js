import React from 'react';
import './MintNft.css'
// import character from './character.png';


const MintNft = (props) => {
  return(
    <div className="m-5 p-3 col-">
      <div className="m-5 p-3 border border-white rounded">
        <div className="">
          <form>
            <fieldset>
              <legend>Legend</legend>
              <div class="form-group">
                <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <div class="form-group">
                <label for="exampleSelect1" class="form-label mt-4">Example select</label>
                <select class="form-select" id="exampleSelect1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleSelect2" class="form-label mt-4">Example multiple select</label>
                <select multiple="" class="form-select" id="exampleSelect2">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleTextarea" class="form-label mt-4">Example textarea</label>
                <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
              </div>
              <div class="form-group">
                <label for="formFile" class="form-label mt-4">Default file input example</label>
                <input class="form-control" type="file" id="formFile" />
              </div>
              
              <fieldset class="form-group">
                <legend class="mt-4">Checkboxes</legend>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Default checkbox
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked="" />
                  <label class="form-check-label" for="flexCheckChecked">
                    Checked checkbox
                  </label>
                </div>
              </fieldset>
              <fieldset class="form-group">
                <legend class="mt-4">Switches</legend>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked="" />
                  <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
                </div>
              </fieldset>
              <button type="submit" class="btn btn-primary">Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}


export default MintNft;