$(document).ready(function() {
	
	// ������� ����� � ��������� ������ ������ ��� ��������
	$('#filterForm').each (function(){
	  this.reset();
          if ($('#block-content').html() == '') AjaxRequest.form('filterForm', '�������� ������...', {});
	});	
	
	$('form#filterForm li').click(function(){
	
		var parent = $(this);
	
		if (parent.find('div.chck').hasClass('checked') == false)
		{
			parent.find('div.chck').addClass('checked');
			parent.find('input:checkbox').attr('checked', true);
		}
		else
		{
			parent.find('div.chck').removeClass('checked');
			parent.find('input:checkbox').attr('checked', false);		
		};
		
		//���������� ������ �� ������ � ��������� ����� ������
		AjaxRequest.form('filterForm', '�������� ������...', {});
		return false;		
		
	});
	
	// ������� ����� � ��������� ������ ������ ��� ������� �� ������ ��������
	$('#clear').click(function(){
	
		//clear form
		$('#filterForm').each (function(){
		  this.reset();
		});

		$('form#filterForm li').each(function(){
		
			var parent = $(this);
		
			if (parent.find('div.chck').hasClass('checked') != false)
			{
				parent.find('div.chck').removeClass('checked');
				parent.find('input:checkbox').attr('checked', false);		
			};	
			
		});		
		AjaxRequest.form('filterForm', '�������� ������...', {});
		return false;
	});
	
        /*
         * reset form
         */
        $('a.empty_block_right').live('click', function(){
            //clear form
            $('#filterForm').each (function(){
                this.reset();
            });
            
            //clear checkbox
            $('form#filterForm li').each(function(){
		
                var parent = $('#filterForm');

                if (parent.find('div.chck').hasClass('checked') != false)
                {
                    parent.find('div.chck').removeClass('checked');
                    parent.find('input:checkbox').attr('checked', false);		
                };	
		
            });
            
            AjaxRequest.form('filterForm', '�������� ������...', {});
            return false;
        });
        
	/*$('a.readmore-stock').live('click', function(){
		if ($(this).parent().find('div.content').css('display') == 'none') {$('div.content').hide(); $(this).parent().find('div.content').slideDown('slow', function() {});}
		else $(this).parent().find('div.content').slideUp('slow', function() {});
				
	});*/
	
})